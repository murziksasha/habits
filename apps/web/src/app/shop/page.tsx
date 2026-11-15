import { UI } from "@eduforge/shared";
import { ShopClient } from "./shop-client";

/** Cosmetics shop — RSC shell + client catalog island. */
export default function ShopPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.shop}</h1>
      <ShopClient />
    </>
  );
}
