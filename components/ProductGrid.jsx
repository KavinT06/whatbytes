import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products }) {
    return (
        <section>
            <h2 className="mb-4 text-5xl font-black text-slate-900">Product Listing</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
