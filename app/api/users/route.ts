import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
        },
      });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[users_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
