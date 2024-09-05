export const fetchProfileInfo = () => {
    return fetch("http://localhost:8000/user_profile", {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };