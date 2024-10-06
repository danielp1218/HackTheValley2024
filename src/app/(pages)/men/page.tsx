"use client";
import {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {useGlobalContext} from "../../contexts/globalContexts";
import LoadingScreen from "@/app/components/LoadingScreen";

const Men: React.FC = () => {
    const {addToCart, } = useGlobalContext();
    const searchParams = useSearchParams();
    const personImageUrl = decodeURIComponent(searchParams.get("person") || "");
    const productImageUrl = decodeURIComponent(searchParams.get("product") || "");
    const data = searchParams.get("data");

    let item = null;
    if (data) {
        try {
            item = JSON.parse(decodeURIComponent(data));
        } catch (error) {
            console.error("Failed to parse data:", error);
        }
    }

    const [, setLoading] = useState(false);
    const [, setError] = useState("");
    const [resultUrl, setResultUrl] = useState("");

    const performVirtualTryOn = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/tryon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({personImageUrl, productImageUrl}),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            // Handle the final result directly
            handleResult(data);
        } catch (error) {
            setError(`Could not perform virtual try-on: ${error}`);
        } finally {
            setLoading(false);
        }
    };
    const handleResult = (data) => {
        // Handle the final result here
        if (data.status === "success" && data.output) {
            setResultUrl(data.output); // Directly assign data.output since it's a string
        } else {
            setError("Failed to get the virtual try-on result.");
        }
    };
    useEffect(() => {
        if (personImageUrl && productImageUrl) {
            performVirtualTryOn();
        }
    }, [personImageUrl, productImageUrl]);
    if (!resultUrl) {
        return (<LoadingScreen/>);
    } else {
        return (
            <div className="flex justify-center">
                <div className="flex flex-row">
                    <div className="rounded-3xl mt-16 p-6 max-h-[40%]">
                        <img
                            className="rounded-3xl shadow-lg object-contain w-full h-full"
                            src={resultUrl}
                            alt="Virtual Try-On Result"
                        />
                    </div>

                    <div className="mt-24 ml-16">
                        <p className="font-bold text-xl">{item.title}</p>
                        <button
                            className="px-10 h-10 bg-primary text-white rounded-full"
                            onClick={() => {
                                if (item) {
                                    addToCart({
                                        imageSrc: item.imageSrc,
                                        title: item.title,
                                        price: item.price,
                                        color: "#EEDDCC",
                                    });
                                    setTimeout(() => {
                                        window.location.href = "/shoppingcart";
                                    }, 1000);
                                } else {
                                    console.error("Item data is not available");
                                }
                            }}
                        >
                            <span className="font-semibold">Add to bag</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Men;
