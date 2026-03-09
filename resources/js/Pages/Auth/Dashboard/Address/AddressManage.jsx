import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/ui/Button";
import LinkButton from "@/Components/ui/LinkButton";
import SelectInput from "@/Components/ui/SelectInput";
import TextAreaInput from "@/Components/ui/TextAreaInput";
import AuthDashboardLayout from "@/Layouts/AuthDashboard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import React from "react";

export default function AddressManage({ address }) {
    const [province, setProvince] = React.useState([]);
    const [city, setCity] = React.useState([]);
    const [district, setDistrict] = React.useState([]);
    const [subdistrict, setSubdistrict] = React.useState([]);

    const { data, setData, processing, post, put, errors } = useForm({
        shipping_name: address?.shipping_name ?? "",
        shipping_phone: address?.shipping_phone ?? "",
        shipping_address_detail: address?.shipping_address_detail ?? "",
        shipping_province_id: address?.shipping_province_id ?? "",
        shipping_city_id: address?.shipping_city_id ?? "",
        shipping_district_id: address?.shipping_district_id ?? "",
        shipping_subdistrict_id: address?.shipping_subdistrict_id ?? "",

        // shipping_district_name: address?.shipping_district_name ?? "",
        // shipping_subdistrict_name: address?.shipping_subdistrict_name ?? "",
    });

    // get provinces
    React.useEffect(() => {
        const getProvinces = async () => {
            try {
                const res = await axios.get(`/api/rajaongkir/province`);
                setProvince(
                    res.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))
                );
            } catch (error) {
                console.log("error: ", error);
            }
        };

        getProvinces();
    }, []);

    // get city
    React.useEffect(() => {
        const getCities = async () => {
            if (!address?.shipping_city_id) {
                setData("shipping_city_id", "");
            }
            setCity([]);

            if (data.shipping_province_id) {
                try {
                    const res = await axios.get(
                        `/api/rajaongkir/city/${data.shipping_province_id}`
                    );
                    setCity(
                        res.data.data.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))
                    );
                } catch (error) {
                    console.error("error: ", error);
                }
            }
        };

        getCities();
    }, [data.shipping_province_id]);

    // get district
    React.useEffect(() => {
        const getDistrict = async () => {
            if (!address?.shipping_district_id) {
                setData("shipping_district_id", "");
            }
            setDistrict([]);

            if (data.shipping_city_id) {
                try {
                    const res = await axios.get(
                        `/api/rajaongkir/district/${data.shipping_city_id}`
                    );
                    setDistrict(
                        res.data.data.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))
                    );
                } catch (error) {
                    console.error("error: ", error);
                }
            }
        };

        getDistrict();
    }, [data.shipping_city_id]);

    // get subdistrict
    React.useEffect(() => {
        const getSubdistrict = async () => {
            if (!address?.shipping_subdistrict_id) {
                setData("shipping_subdistrict_id", "");
            }
            setSubdistrict([]);

            if (data.shipping_district_id) {
                try {
                    const res = await axios.get(
                        `/api/rajaongkir/subdistrict/${data.shipping_district_id}`
                    );
                    setSubdistrict(
                        res.data.data.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))
                    );
                } catch (error) {
                    console.error("error: ", error);
                }
            }
        };

        getSubdistrict();
    }, [data.shipping_district_id]);

    const hanldeSubmit = (e) => {
        e.preventDefault();

        if (address) {
            put(
                route("address.update", {
                    id: address.id,
                }),
                { showProgress: false }
            );
        } else {
            post(route("address.store"), { showProgress: false });
        }
    };

    return (
        <AuthDashboardLayout
            title={`${address ? "Update Address" : "Create Address"}`}
            buttonOpenNavLink={false}
            buttonNavBack={true}
            buttonNavBackPathName={`/account/address`}
        >
            {/* header content */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4 lg:mb-4">
                <Link
                    href={`/account/address`}
                    className="rounded-full border border-dark-green p-2 z-10"
                >
                    <ArrowLeftIcon className={`size-5 text-dark-green`} />
                </Link>
                <h1 className="w-full text-start text-xl font-semibold text-dark-green">
                    {`${address ? "Update Address" : "Create Address"}`}
                </h1>
            </div>

            {/* content */}
            <form
                onSubmit={hanldeSubmit}
                className="border border-gray-300 rounded-2xl px-6 py-8"
            >
                {/* receipt name */}
                <div>
                    <InputLabel htmlFor="name" value="Recipient's Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.shipping_name}
                        placeholder="Enter recipient's shipping name"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) =>
                            setData("shipping_name", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.shipping_name}
                        className="mt-2"
                    />
                </div>

                {/* province and city */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 mt-4">
                    <div>
                        <InputLabel htmlFor="province" value="Province" />

                        <SelectInput
                            id={"shipping_province_id"}
                            value={data.shipping_province_id}
                            defaultOption={"Select Province"}
                            onChange={(e) =>
                                setData("shipping_province_id", e.target.value)
                            }
                            items={province}
                            disabled={province.length === 0}
                        />

                        <InputError
                            message={errors.shipping_province_id}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="city" value="City" />

                        <SelectInput
                            id={"shipping_city_id"}
                            value={data.shipping_city_id}
                            defaultOption={"Select City"}
                            onChange={(e) =>
                                setData("shipping_city_id", e.target.value)
                            }
                            items={city}
                            disabled={
                                city.length === 0 || !data.shipping_province_id
                            }
                        />

                        <InputError
                            message={errors.shipping_city_id}
                            className="mt-2"
                        />
                    </div>
                </div>

                {/* district and subdistrict */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 mt-4">
                    <div>
                        <InputLabel htmlFor="district" value="District" />

                        <SelectInput
                            id={"shipping_district_id"}
                            value={data.shipping_district_id}
                            defaultOption={"Select District"}
                            onChange={(e) =>
                                setData("shipping_district_id", e.target.value)
                            }
                            items={district}
                            disabled={
                                district.length === 0 || !data.shipping_city_id
                            }
                        />

                        <InputError
                            message={errors.shipping_district_id}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="subdistrict" value="Subdistrict" />

                        <SelectInput
                            id={"shipping_subdistrict_id"}
                            value={data.shipping_subdistrict_id}
                            defaultOption={"Select Subdistrict"}
                            onChange={(e) =>
                                setData(
                                    "shipping_subdistrict_id",
                                    e.target.value
                                )
                            }
                            items={subdistrict}
                            disabled={
                                subdistrict.length === 0 ||
                                !data.shipping_district_id
                            }
                        />

                        <InputError
                            message={errors.shipping_subdistrict_id}
                            className="mt-2"
                        />
                    </div>
                </div>

                {/* subdistrict */}
                {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 mt-4">
                    <div className="">
                        <InputLabel htmlFor="district" value="District" />

                        <TextInput
                            id="district"
                            name="district"
                            value={data.shipping_district_name}
                            placeholder="district"
                            className="mt-1 block w-full"
                            autoComplete="district"
                            onChange={(e) =>
                                setData(
                                    "shipping_district_name",
                                    e.target.value
                                )
                            }
                            required
                        />

                        <InputError
                            message={errors.shipping_district_name}
                            className="mt-2"
                        />
                    </div>
                    <div className="">
                        <InputLabel htmlFor="subdistrict" value="Subdistrict" />

                        <TextInput
                            id="subdistrict"
                            name="subdistrict"
                            value={data.shipping_subdistrict_name}
                            placeholder="Subdistrict"
                            className="mt-1 block w-full"
                            autoComplete="subdistrict"
                            onChange={(e) =>
                                setData(
                                    "shipping_subdistrict_name",
                                    e.target.value
                                )
                            }
                            required
                        />

                        <InputError
                            message={errors.shipping_subdistrict_name}
                            className="mt-2"
                        />
                    </div>
                </div> */}

                {/* phone number */}
                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        name="phone"
                        placeholder="Your phone number"
                        value={data.shipping_phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(e) =>
                            setData("shipping_phone", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.shipping_phone}
                        className="mt-2"
                    />
                </div>

                {/* address detail */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="address_detail"
                        value="Address Detail"
                    />

                    <TextAreaInput
                        id="address_detail"
                        name="address_detail"
                        value={data.shipping_address_detail}
                        onChange={(e) =>
                            setData("shipping_address_detail", e.target.value)
                        }
                        className="w-full mt-1 block"
                    />

                    <InputError
                        message={errors.shipping_address_detail}
                        className="mt-2"
                    />
                </div>

                {/* button submit */}
                <div className="mt-8 flex items-center justify-end w-full">
                    <Button
                        type="submit"
                        loading={processing}
                        variant="primary"
                        className="w-full sm:w-[10rem]"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </AuthDashboardLayout>
    );
}
