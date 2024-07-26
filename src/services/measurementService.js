export const getAllMeasurementUnits = async (token) => {
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch('http://localhost:8000/measurement_units', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (response.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching measurement units:', error);
    }
}