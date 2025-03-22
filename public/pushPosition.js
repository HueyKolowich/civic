document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("issueForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        // Get form values
        const level = document.getElementById("level").value;
        const candidate_name = document.getElementById("candidate_name").value.trim();
        const candidate_id = nameToDecimal(candidate_name); // Convert name to decimal ID
        const level_id = 1; // Fixed value

        // Get all issues and positions
        const issues = [
            { issue: document.getElementById("issue1").value.trim(), position: document.getElementById("position1").value.trim() },
            { issue: document.getElementById("issue2").value.trim(), position: document.getElementById("position2").value.trim() },
            { issue: document.getElementById("issue3").value.trim(), position: document.getElementById("position3").value.trim() }
        ];

        // Validate input
        if (!level || !candidate_name || issues.some(i => !i.issue || !i.position)) {
            alert("All fields are required!");
            return;
        }

        // Create request payload
        const requestBody = {
            positions: issues.map(issueData => ({
                level: level,
                level_id: level_id, // Always set to 1
                candidate_id: candidate_id,
                issue: issueData.issue,
                position: issueData.position
            }))
        };

        try {
            // Send POST request
            const response = await fetch("http://localhost:4200/positions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            alert("Issue submitted successfully!");
            console.log("Response:", responseData);

            // Reset form
            document.getElementById("level").value = "Municipal";
            document.getElementById("candidate_name").value = "";
            document.getElementById("issue1").value = "";
            document.getElementById("position1").value = "";
            document.getElementById("issue2").value = "";
            document.getElementById("position2").value = "";
            document.getElementById("issue3").value = "";
            document.getElementById("position3").value = "";
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send request. Check console for details.");
        }
    });

    // Function to convert candidate name into a decimal ID
    function nameToDecimal(name) {
        if (!name) return 0;
        
        let sum = 0;
        for (let i = 0; i < name.length; i++) {
            sum += name.charCodeAt(i); // Convert each character to ASCII and sum
        }

        return sum; // Normalize the value by dividing by 1000
    }
});
