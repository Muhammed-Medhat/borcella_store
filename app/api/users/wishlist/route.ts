import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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
      return new NextResponse("User not found", { status: 404 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return new NextResponse("Product Id required", { status: 400 });
    }

    const isLiked = user.wishlist.includes(productId);

    if (isLiked) {
      // Remove productId from wishlist
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      // Add productId to wishlist
      user.wishlist.push(productId);
    }

    // Save the updated wishlist back to the database
    const updatedUser = await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        wishlist: user.wishlist,
      },
    });


    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("[wishlist_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
