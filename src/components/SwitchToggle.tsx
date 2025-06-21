import React from "react";

interface SwitchToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    onColor?: string;
    offColor?: string;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({
    checked,
    onChange,
    onColor = "#4ade80",  // green-400
    offColor = "#d1d5db", // gray-300
}) => {
    return (
        <div
            role="switch"
            aria-checked={checked}
            tabIndex={0}
            onClick={() => onChange(!checked)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onChange(!checked);
            }}
            className="w-[48px] h-[24px] rounded-full cursor-pointer flex items-center px-[2px] transition-colors duration-300"
            style={{
                backgroundColor: checked ? onColor : offColor,
            }}
        >
            <div
                className={`w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? "translate-x-[24px]" : "translate-x-0"
                    }`}
            />
        </div>
    );
};

export default SwitchToggle;
