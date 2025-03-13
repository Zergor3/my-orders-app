export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric", month: "2-digit", day: "2-digit"
    });
};