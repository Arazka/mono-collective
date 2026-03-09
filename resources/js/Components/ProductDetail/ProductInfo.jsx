import Breadcrumbs from "../ui/Breadcrumbs";

export default function ProductInfo({ breadcrumbsData, name, price }) {
    return (
        <div>
            <div className="hidden md:block">
                <Breadcrumbs pages={breadcrumbsData} />
            </div>
            <h1 className="text-xl md:text-2xl text-dark-green">{name}</h1>
            <div className="mt-2">
                <p className="text-base font-medium">{price}</p>
            </div>
        </div>
    );
}
