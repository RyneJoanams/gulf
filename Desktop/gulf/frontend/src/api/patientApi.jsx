export const submitPatientData = async (data) => {
    // Simulate an API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Here you would typically send a request to a real API
        console.log('Data submitted:', data);
        resolve(); // Simulate successful submission
      }, 1000);
    });
  };
  