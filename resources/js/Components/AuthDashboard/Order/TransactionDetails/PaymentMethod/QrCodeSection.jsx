export default function QrCodeSection({ qrCodeURL }) {
    return (
        <div className="py-4 bg-indigo-50 rounded-lg px-4 border-l-4 border-indigo-500">
            <div className="w-full flex flex-col items-center justify-center">
                <span className="text-gray-700 font-medium block mb-4 text-center">
                    Scan QR Code untuk Pembayaran
                </span>
                <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                    <img
                        src={qrCodeURL}
                        alt="QR Code Payment"
                        className="w-48 h-48 mx-auto"
                    />
                </div>
                <ul className="mt-4 text-xs text-gray-600 list-disc ml-4">
                    <li>Buka aplikasi e-wallet atau mobile banking</li>
                    <li>Pilih menu scan QR Code</li>
                    <li>Scan kode QR di atas</li>
                    <li>Konfirmasi pembayaran sesuai nominal</li>
                </ul>
            </div>
        </div>
    );
}
