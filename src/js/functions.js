// Cache DOM elements for better performance
const popup = document.querySelector(".popup");
const firstStep = document.querySelector(".popup.first-step");
const secondStep = document.querySelector(".popup.second-step");
const body = document.body;

// Initialize functionality when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	initializeFormValidation();
	initializePopupActions();
});

/**
 * Initializes form validation for the subscription form.
 */
const initializeFormValidation = () => {
	const form = document.querySelector(".form.subscribe");
	const emailInput = form.querySelector(".input.mail");

	form.addEventListener("submit", (event) => {
		event.preventDefault(); // Prevent default form submission
		clearErrors(); // Clear any existing validation errors

		let isValid = true;

		// Validate email input
		if (!emailInput.value.trim()) {
			showError(emailInput);
			isValid = false;
		} else if (!isValidEmail(emailInput.value)) {
			showError(emailInput);
			isValid = false;
		}

		// If validation passes, proceed to the next step
		if (isValid) {
			alert("Form submitted successfully!");
			firstStep.classList.remove("visible");
			secondStep.classList.add("visible");
			form.reset(); // Reset form fields
		}
	});
};

/**
 * Validates an email address using a regular expression.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};

/**
 * Displays a validation error on an input field.
 * @param {HTMLElement} input - The input element to mark as invalid.
 */
const showError = (input) => {
	input.classList.add("error");
};

/**
 * Clears all validation errors from the form.
 */
const clearErrors = () => {
	// Remove error class from all inputs
	document.querySelectorAll(".input.error").forEach((input) => {
		input.classList.remove("error");
	});

	// Remove all error messages (if any)
	document.querySelectorAll(".error-message").forEach((message) => {
		message.remove();
	});
};

/**
 * Initializes popup open and close actions.
 */
const initializePopupActions = () => {
	initializeOpenPopup();
	initializeClosePopup();
};

/**
 * Adds event listeners to handle opening the popup.
 */
const initializeOpenPopup = () => {
	const openButton = document.querySelector(".btn.open");
	openButton.addEventListener("click", (event) => {
		event.preventDefault();
		firstStep.classList.add("visible");
		body.classList.add("popup-visible");
	});
};

/**
 * Adds event listeners to handle closing the popup.
 */
const initializeClosePopup = () => {
	const closeButtons = document.querySelectorAll(".btn.close");

	// Add event listener to all close buttons
	closeButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			event.preventDefault();
			closePopup();
		});
	});

	// Close popup if clicking outside or pressing "Escape"
	document.addEventListener("click", (event) => {
		if (
			popup && 
			!popup.contains(event.target) && 
			!event.target.closest(".btn.open") && 
			body.classList.contains("popup-visible")
		) {
			closePopup();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && body.classList.contains("popup-visible")) {
			closePopup();
		}
	});
};

/**
 * Handles the closing of the popup and resetting states.
 */
const closePopup = () => {
	firstStep?.classList.remove("visible");
	secondStep?.classList.remove("visible");
	body.classList.remove("popup-visible");
};
