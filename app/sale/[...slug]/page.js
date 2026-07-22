import SalesBanner from "@/features/sales/SalesBanner";
import SalesCategory from "@/features/sales/SalesCategory";
import SalesHeader from "@/features/sales/SalesHeader";
import SalesProduct from "@/features/sales/SalesProduct";
import SalesProductTool from "@/features/sales/SalesProductTool";
import SalesSidebar from "@/features/sales/SalesSidebar";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Item from "@/models/Item";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";


async function page({ searchParams, params }) {
  const resolvedParams = await params;
  const filters = await searchParams;
  const slug = resolvedParams.slug || [];
  const subCategorySlug = slug[1];
  const { colors, size, discount, ratings, price, cat, page } = filters;
  const sortby = slug[2];

  const productFilters = {
    ...(!cat && {
      subCategorySlug: subCategorySlug,
      discountPercentage: { $gte: Number(1) },
    }),
    ...(cat && {
      itemSlug: { $in: cat.split(",") },
      discountPercentage: { $gte: Number(1) },
    }),
    ...(price && { price: { $lt: Number(price) } }),
    ...(size && { "attributes.sizes": { $in: size.split(",") } }),
    ...(colors && { "attributes.colors": { $in: colors.split(",") } }),
    ...(ratings && {
      "ratings.average":
        Number(ratings) === 5
          ? 5
          : {
              $gte: Number(ratings),
              $lt: Number(ratings) + 1,
            },
    }),
    ...(discount && {
      discountPercentage: {
        $gte: Number(discount),
      },
    }),
  };

  let sort = {};

  switch (sortby) {
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
      sort = { createdAt: -1 };
  }

  const limit = 15;
  await connectDB();

  const [
    product,
    category,
    subCategory,
    itemCategory,
    productCount,
    totalProductCount,
    mostDiscount,
  ] = JSON.parse(
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
        Item.find().select("name slug gender colors").lean(),
        Product.countDocuments(productFilters),
        Product.countDocuments({ discountPercentage: { $gte: Number(1) } }),
        Product.findOne()
          .sort({ discountPercentage: -1 })
          .select(
            "name slug gender images price stock isOnSale description shortDescription currency attributes ratings discountPercentage item subCategory",
          )
          .lean(),
      ]),
    ),
  );


  return (
    <div className="w-full h-full relative">
      <SalesHeader productCount={totalProductCount}></SalesHeader>
      <SalesBanner mostDiscount={mostDiscount}></SalesBanner>
      <SalesCategory
        category={category}
        subCategory={subCategory}
        gender={slug[0]}
        subCat={subCategorySlug}
      ></SalesCategory>
      <div className="flex flex-row w-full h-full">
        <SalesSidebar
          category={itemCategory}
          gender={slug[0]}
          filters={filters}
        ></SalesSidebar>
        <div className="flex flex-col w-full h-full ">
          <SalesProductTool></SalesProductTool>

            <SalesProduct
              product={product}
              productCount={productCount}
            ></SalesProduct>

        </div>
      </div>
    </div>
  );
}

export default page;
