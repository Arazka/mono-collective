export const addresses = [
    {
        id: 1,
        name: "John Doe",
        phone: "628736458734",
        address:
            "Dusun Konoha rt007/rw007,Kec.Konoha, Kab.Konoha, Konoha Tengah",
    },
    {
        id: 2,
        name: "Doe John",
        phone: "628736458734",
        address:
            "Dusun Konoha rt007/rw007,Kec.Konoha, Kab.Konoha, Konoha Tengah",
    },
    {
        id: 3,
        name: "John Shena",
        phone: "628736458734",
        address:
            "Dusun Konoha rt007/rw007,Kec.Konoha, Kab.Konoha, Konoha Tengah",
    },
];

export const shippingMethods = [
    { name: "JNE - REG", price: "20.000", etd: "2-3 days" },
    { name: "JNE - YES", price: "18.000", etd: "3-5 days" },
    { name: "JNE - OKE", price: "25.000", etd: "1-2 days" },
];

export const payments = [
    {
        src: "/assets/images/bca-logo.png",
        title: "BCA Virtual Account",
        payment_type: "bank_transfer",
        value: "bca",
    },
    {
        src: "/assets/images/bri.jpg",
        title: "BRI Virtual Account",
        payment_type: "bank_transfer",
        value: "bri",
    },
    {
        src: "/assets/images/bni.png",
        title: "BNI Virtual Account",
        payment_type: "bank_transfer",
        value: "bni",
    },
    {
        src: "/assets/images/qris.jpg",
        title: "QRIS",
        payment_type: "qris",
        value: "",
    },
];
