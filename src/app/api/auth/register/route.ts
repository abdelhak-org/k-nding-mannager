import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import {
  createUser,
  ensureUsersIndexes,
  findUserByEmail,
  toPublicUser,
} from "@/lib/db/users";
import { registerFormSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsedBody = registerFormSchema.safeParse(body);
   console.log("Parsed body:", parsedBody); // Debug log
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fieldErrors: parsedBody.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  await ensureUsersIndexes();

  const existingUser = await findUserByEmail(parsedBody.data.email);

  if (existingUser) {
    return NextResponse.json(
      {
        error: "An account with this email already exists.",
      },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(parsedBody.data.password, 12);
  const displayName =
    `${parsedBody.data.firstName} ${parsedBody.data.lastName}`.trim();

  try {
    const user = await createUser({
      email: parsedBody.data.email,
      hashedPassword,
      displayName,
    });
     console.log("Created user:", user); // Debug log
    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: toPublicUser(user),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return NextResponse.json(
        {
          error: "An account with this email already exists.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        error: "Unable to create account right now.",
      },
      { status: 500 },
    );
  }
}
