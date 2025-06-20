import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { registerSchema } from "../../../../lib/schemas/registerSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      const formatted = result.error.flatten().fieldErrors;

      if (process.env.NODE_ENV !== "test") {
        console.error("[REGISTER_ERROR]", result.error);
      }
      const firstError = Object.values(formatted)[0]?.[0] || "Invalid input";

      return NextResponse.json({ message: firstError }, { status: 422 });
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("[REGISTER_ERROR]", error);
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
