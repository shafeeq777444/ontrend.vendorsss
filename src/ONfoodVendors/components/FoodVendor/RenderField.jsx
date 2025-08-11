import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useUpdateVendorProfile } from "../../../services/queries/vendor.query";
import { getAuth } from "firebase/auth";
import ReusableConfirmationModal from "../common/ReusableConfirmationModal";
import toast from "react-hot-toast";

export default function RenderField({ label, value, onSave, fieldName = "", additionalPhone = [] }) {
    const { mutateAsync } = useUpdateVendorProfile();
    const user = getAuth().currentUser;
    const userId = user?.uid;
    const textStyle = "mt-1 text-sm text-gray-600";
    const labelStyle = "text-sm font-medium text-gray-700";

    const editableLabels = [
        "Phone Number",
        "Account Number",
        "IFSC Code",
        "Additional Phone Number 1",
        "Additional Phone Number 2",
        "Additional Phone Number 3",
    ];
    const isEditable = editableLabels.includes(label) && !value;
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [hasSaved, setHasSaved] = useState(false);

    const handleSave = () => {
        if (!inputValue.trim()) return;
        setShowConfirmModal(true);
    };

    const confirmSave = async () => {
        setShowConfirmModal(false);
        setEditing(false);
    
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;
        console.log(trimmedInput,"iiii");
        console.log(fieldName,"kkkk");
        if (fieldName === "additionalPhone" && Array.isArray(additionalPhone) && additionalPhone.length < 3) {
            const currentAdditionalPhones = [...additionalPhone];
            console.log(currentAdditionalPhones,"jjjj");
    
            if (currentAdditionalPhones.includes(trimmedInput)) {
                // Show toast if duplicate
                toast.success("This phone number is already added.");
                return;
            }
    
            currentAdditionalPhones.push(trimmedInput);
    
            await mutateAsync({
                vendorId: userId,
                updatedData: {
                    additionalPhone: currentAdditionalPhones,
                },
            });
    
        } else if (fieldName !== "additionalPhone") {
            // For other fields, just save normally without duplication check or toast
            await mutateAsync({
                vendorId: userId,
                updatedData: {
                    [fieldName]: trimmedInput,
                },
            });
        }
    
        onSave?.(trimmedInput);
        setInputValue("");
        setHasSaved(true);
    };
    

    return (
        <div>
            <label className={labelStyle}>{label}</label>

            {isEditable ? (
                editing ? (
                    <div className="mt-1 flex gap-2 items-center">
                        <input
                            type="text"
                            className="border rounded px-2 py-1 text-sm text-gray-700 w-full max-w-xs"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                                onClick={() => {
                                    setEditing(false);
                                    setInputValue("");
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-gradient-to-r hover:from-sky-600 hover:to-blue-600 disabled:opacity-50"
                                onClick={handleSave}
                                disabled={!inputValue.trim()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        className="mt-1 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                        onClick={() => setEditing(true)}
                        aria-label={`Add ${label}`}
                    >
                        <PlusIcon className="h-4 w-4" />
                        Add {label.toLowerCase()}
                    </button>
                )
            ) : (
                <div className="flex items-center justify-between">
                    <p className={textStyle}>{value || "—"}</p>
                </div>
            )}

            {/* Use ReusableConfirmationModal */}
            <ReusableConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onAction={confirmSave}
                title={`Confirm ${label}`}
                description={`Please confirm the ${label.toLowerCase()} as it can only be set once. For any changes, you'll need to contact our support team.`}
                closeText="Cancel"
                actionText="Confirm & Save"
            />
        </div>
    );
}
