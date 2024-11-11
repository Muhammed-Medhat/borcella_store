"use client";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product,updateSignedInUser }: ProductCardProps) => {
  // const router = useRouter();
  // const { user } = useUser();

  // const [loading, setLoading] = useState<boolean>(false);
  // const [signInUser, setSignInUser] = useState<UserType | null>(null);
  // const [isLiked, setIsLiked] = useState<boolean>(false);

  // const getUser = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch("/api/users", {
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     setSignInUser(data);
  //     setIsLiked(data.wishlist.includes(product.id.toString()));
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("[users_GET]", error);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     getUser();
  //   }
  // }, [user]);

  // const handleLike = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   try {
  //     if (!user) {
  //       router.push("/sign-in");
  //       return;
  //     } else {
  //       setLoading(true);
  //       const res = await fetch("/api/users/wishlist", {
  //         method: "POST",
  //         body: JSON.stringify({ productId: product.id.toString() }),
  //       });
  //       const updatedUser = await res.json();
  //       setSignInUser(updatedUser);
  //       setIsLiked(updatedUser.wishlist.includes(product.id.toString()));
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log("[wishlist_POST]", error);
  //   }
  // };

  return (
    <Link
      href={`/products/${product.id}`}
      className=" w-[220px] flex flex-col gap-2 cursor-pointer"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover "
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className=" flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  );
};

export default ProductCard;
