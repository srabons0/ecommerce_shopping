import AdminProduct from "@/features/admin/dashboard/product/AdminProduct";
import AdminProductTool from "@/features/admin/dashboard/product/AdminProductTool";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Item from "@/models/Item";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";

async function page({ searchParams }) {
  const filters = await searchParams;
  const { sortBy, page, categories, subcategories, item, status, search } =
    filters;
  const productFilters = {
    ...(search && { name: search }),
    ...(categories !== "all" && {
      gender: categories,
    }),
    ...(subcategories !== "all" && {
      subCategorySlug: subcategories,
    }),
    ...(item !== "all" && {
      itemSlug: item,
    }),
    ...(status === "sale" && {
      isOnSale: true,
    }),
    ...(status === "active" && {
      isActive: true,
    }),
    ...(status === "inactive" && {
      isActive: false,
    }),
    ...(status === "featured" && {
      isFeatured: true,
    }),
    ...(status === "new" && {
      isNewArrival: true,
    }),
    ...(status === "out-of-stock" && {
      stock: {
        $lte: 0,
      },
    }),
    ...(status === "low-stock" && {
      stock: {
        $gte: 1,
        $lte: 10,
      },
    }),
  };

  let sort = {};

  switch (sortBy) {
    case "newest":
      sort = { createdAt: -1 };
      break;
    case "popular":
      sort = { salesCount: -1 };
      break;
    case "price-asc":
      sort = { price: 1 };
      break;
    case "price-desc":
      sort = { price: -1 };
      break;
    case "rating":
      sort = { "ratings.average": -1 };
      break;
    case "viewed":
      sort = { viewCount: -1 };
      break;
    case "AtoZ":
      sort = { name: 1 };
      break;
    case "ZtoA":
      sort = { name: -1 };
      break;
    default:
      sort = {};
  }

  const limit = 15;
  await connectDB();

  const [product, category, subCategory, itemCategory, productCount] =
    JSON.parse(
      JSON.stringify(
        await Promise.all([
          Product.find(productFilters)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(sort)
            .select(
              "name slug gender images price stock isOnSale description shortDescription currency attributes ratings discountPercentage item subCategory",
            )
            .lean(),
          Category.find().select("gender").lean(),
          SubCategory.find().select("name slug gender").lean(),
          Item.find().select("name slug gender colors subCategorySlug").lean(),
          Product.countDocuments(productFilters),
        ]),
      ),
    );
   return (
    <div className=" w-full">
      <AdminHeader
        path={"Products"}
        name={" Product Management"}
        desc={"Manage products, inventory, pricing and product visibility."}
      ></AdminHeader>
      <AdminProductTool
        category={category}
        subCategory={subCategory}
        itemCategory={itemCategory}
        productCount={productCount}
        filters={filters}
      ></AdminProductTool>
      <AdminProduct
        searchP={searchParams}
        filters={filters}
        product={product}
        productCount={productCount}
      ></AdminProduct>
    </div>
  );
}

export default page;
