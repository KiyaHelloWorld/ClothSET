import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        mobileNumber: "",
        isAdmin: false
    }),

    actions: {
        setUser(userData) {
            const mobileNo = userData.mobileNo || userData.mobileNumber || "";

            this.firstName = userData.firstName || "";
            this.lastName = userData.lastName || "";
            this.email = userData.email || "";
            this.mobileNo = mobileNo;
            this.mobileNumber = mobileNo;
            this.isAdmin = Boolean(userData.isAdmin);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    mobileNo: this.mobileNo,
                    isAdmin: this.isAdmin
                })
            );
            localStorage.setItem("email", this.email);
        },

        initializeUser() {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                return;
            }

            try {
                this.setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("user");
            }
        },

        clearUser() {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.mobileNo = "";
            this.mobileNumber = "";
            this.isAdmin = false;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("email");
        }
    }
});