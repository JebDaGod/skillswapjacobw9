
const API_BASE_URL = 'http://localhost:3000/api';

// Fetch skills from the backend API
async function fetchSkills() {
    const response = await fetch(`${API_BASE_URL}/skills`);

    if (!response.ok) {
        throw new Error(`Failed to fetch skills: ${response.status}`);
    }

    const skills = await response.json();

    if (!Array.isArray(skills)) {
        throw new Error('The API did not return a valid skills array.');
    }

    return skills;
}

// Create a new skill in the database
async function createSkill(skillData) {
    const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(skillData)
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || `Failed to create skill: ${response.status}`);
    }

    return await response.json();
}

// Export functions for browser and testing
if (typeof window !== 'undefined') {
    window.fetchSkills = fetchSkills;
    window.createSkill = createSkill;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchSkills,
        createSkill
    };
}
