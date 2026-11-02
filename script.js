
// Skills are loaded from the API instead of hardcoded data
let skills = [];

// Filter skills by category
function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
        return skills;
    }

    return skills.filter(skill => skill.category === category);
}

// Calculate total cost
function calculateTotalCosts(hourlyRate, hours) {
    return hourlyRate * hours;
}

// Skill matching
function matchSkillsToUser(userNeeds, skills) {
    return skills.filter(skill =>
        skill.category === userNeeds.category &&
        skill.price <= userNeeds.maxPrice
    );
}

// Browser functionality
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        const exploreButton = document.getElementById("exploreButton");
        const skillsContainer = document.getElementById("skills-container");
        const filterButtons = document.querySelectorAll(".filter-btn");

        // Explore button
        if (exploreButton) {
            exploreButton.addEventListener("click", function () {
                alert("Skill exploration features are coming soon!");
            });
        }

        // Display skill cards
        function displaySkills(category) {
            if (!skillsContainer) return;

            const filteredSkills = filterSkillsByCategory(skills, category);

            if (filteredSkills.length === 0) {
                skillsContainer.innerHTML = '<p>No skills found.</p>';
                return;
            }

            skillsContainer.innerHTML = filteredSkills.map(skill => `
                <div class="skill-card">
                    <h3>${skill.title}</h3>
                    <p>${skill.description}</p>
                    <p><strong>Category:</strong> ${skill.category}</p>
                    <p><strong>Price:</strong> $${Number(skill.price).toFixed(2)}</p>
                    <p><strong>Provider:</strong> ${skill.provider || 'Not specified'}</p>
                </div>
            `).join('');
        }

        // Category filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                displaySkills(category);
            });
        });

        // Load skills from the API
        async function loadSkills() {
            if (skillsContainer) {
                skillsContainer.innerHTML = '<p>Loading skills...</p>';
            }

            try {
                skills = await window.fetchSkills();
                displaySkills('All');
            } catch (error) {
                console.error('Error loading skills:', error);

                if (skillsContainer) {
                    skillsContainer.innerHTML =
                        '<p>Unable to load skills. Please try again later.</p>';
                }
            }
        }

        await loadSkills();

        // Cost calculator
        const calculateButton = document.getElementById("calculate-button");
        const hourlyRateInput = document.getElementById("hourly-rate");
        const hoursInput = document.getElementById("hours");
        const calculationResult = document.getElementById("calculation-result");

        if (calculateButton && hourlyRateInput && hoursInput && calculationResult) {
            calculateButton.addEventListener('click', () => {
                const hourlyRate = parseFloat(hourlyRateInput.value);
                const hours = parseFloat(hoursInput.value);

                if (
                    hourlyRateInput.value === '' ||
                    hoursInput.value === '' ||
                    !Number.isFinite(hourlyRate) ||
                    !Number.isFinite(hours) ||
                    hourlyRate < 0 ||
                    hours < 0
                ) {
                    calculationResult.innerHTML =
                        '<h3>Please enter valid, non-negative numbers.</h3>';
                    return;
                }

                const totalCost = calculateTotalCosts(hourlyRate, hours);

                calculationResult.innerHTML = `
                    <h3>Total Cost: $${totalCost.toFixed(2)}</h3>
                `;
            });
        }

        // Find My Match
        const findMatchButton = document.getElementById("find-match-button");
        const matchCategory = document.getElementById("match-category");
        const matchMaxPrice = document.getElementById("match-max-price");
        const matchResults = document.getElementById("match-results");

        if (findMatchButton && matchCategory && matchMaxPrice && matchResults) {
            findMatchButton.addEventListener('click', () => {
                const category = matchCategory.value;
                const maxPrice = Number(matchMaxPrice.value);

                if (
                    matchMaxPrice.value.trim() === '' ||
                    !Number.isFinite(maxPrice) ||
                    maxPrice < 0
                ) {
                    matchResults.innerHTML =
                        '<p>Please enter a valid maximum price of $0 or more.</p>';
                    return;
                }

                const userNeeds = {
                    category: category,
                    maxPrice: maxPrice
                };

                const matchedSkills = matchSkillsToUser(userNeeds, skills);

                if (matchedSkills.length === 0) {
                    matchResults.innerHTML =
                        '<p>No skills match your category and budget.</p>';
                    return;
                }

                matchResults.innerHTML = matchedSkills.map(skill => `
                    <div class="skill-card">
                        <h3>${skill.title}</h3>
                        <p>${skill.description}</p>
                        <p><strong>Category:</strong> ${skill.category}</p>
                        <p><strong>Price:</strong> $${Number(skill.price).toFixed(2)}</p>
                        <p><strong>Provider:</strong> ${skill.provider || 'Not specified'}</p>
                    </div>
                `).join('');
            });
        }

        // Create Skill Form
        const createSkillForm = document.getElementById("create-skill-form");
        const createSkillMessage = document.getElementById("create-skill-message");

        if (createSkillForm && createSkillMessage) {
            createSkillForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const priceInput = document.getElementById("skill-price");

                const newSkill = {
                    title: document.getElementById("skill-title").value.trim(),
                    category: document.getElementById("skill-category").value,
                    price: Number(priceInput.value),
                    description: document.getElementById("skill-description").value.trim()
                };

                if (
                    !newSkill.title ||
                    !newSkill.category ||
                    !newSkill.description ||
                    priceInput.value.trim() === '' ||
                    !Number.isFinite(newSkill.price) ||
                    newSkill.price < 0
                ) {
                    createSkillMessage.textContent =
                        "Please complete all fields with valid information.";
                    return;
                }

                try {
                    await window.createSkill(newSkill);

                    createSkillMessage.textContent =
                        "Skill created successfully!";

                    createSkillForm.reset();

                    await loadSkills();

                } catch (error) {
                    console.error("Error creating skill:", error);

                    createSkillMessage.textContent =
                        "Unable to create skill. Please try again.";
                }
            });
        }
    });
}

// Export functions for Jest testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterSkillsByCategory,
        calculateTotalCosts,
        matchSkillsToUser
    };
}
