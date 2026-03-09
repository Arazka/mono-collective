import React from "react";
import PropTypes from "prop-types";

export default function SpinLoading({
    size = "w-6 h-6",
    color = "border-blue-500",
    thickness = "border-2",
    speed = "animate-spin",
    className = "",
}) {
    return (
        <div
            className={`${size} ${thickness} ${color} border-t-transparent rounded-full ${speed} ${className}`}
            role="status"
            aria-label="Loading"
        ></div>
    );
}

SpinLoading.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    thickness: PropTypes.string,
    speed: PropTypes.string,
    className: PropTypes.string,
};
