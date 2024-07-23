export const loginUser = (user) => {
  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  }).then(res => {
    if (res.ok) {
      return res.json();  // This will resolve to a JavaScript object
    } else {
      throw new Error('Network response was not ok');
    }
  });
};
  
  export const registerUser = (newUser) => {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
   .then(response => {
      if (response.status === 201) {
        // Handle success without content, e.g., update UI or local storage
        console.log('Registration successful');
        // Optionally, return a resolved promise with a custom value indicating success
        return Promise.resolve({success: true});
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Proceed with parsing JSON if the response is not 204
    })
   .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Handle the error appropriately, perhaps by setting an error state in your component
    });
  }