
const skills = [
    {
        title: "Python Tutoring",
        category: "Programming",
        description: "Learn Python fundamentals and programming concepts.",
        price: 20,
        provider: "Alex"
    },
    {
        title: "Guitar Lessons",
        category: "Music",
        description: "Learn guitar basics, chords, and popular songs.",
        price: 15,
        provider: "Hunter"
    },
    {
        title: "Resume Review",
        category: "Career",
        description: "Get feedback and advice to improve your resume.",
        price: 0,
        provider: "Abby"
    },
    {
        title: "Web Development",
        category: "Programming",
        description: "Learn HTML, CSS, and JavaScript basics.",
        price: 25,
        provider: "Robert"
    }
];

function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
        return skills;
    }

    return skills.filter(skill => skill.category === category);
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const exploreButton = document.getElementById("exploreButton");
        const skillsContainer = document.getElementById("skills-container");
        const filterButtons = document.querySelectorAll(".filter-btn");

        // Existing Explore button functionality
        if (exploreButton) {
            exploreButton.addEventListener("click", function () {
                alert("Skill exploration features are coming soon!");
            });
        }

        // Display skill cards
        function displaySkills(category) {
            const filteredSkills = filterSkillsByCategory(skills, category);

            skillsContainer.innerHTML = filteredSkills.map(skill => `
                <div class="skill-card">
                    <h3>${skill.title}</h3>
                    <p>${skill.description}</p>
                    <p><strong>Category:</strong> ${skill.category}</p>
                    <p><strong>Price:</strong> $${skill.price}</p>
                    <p><strong>Provider:</strong> ${skill.provider}</p>
                </div>
            `).join('');
        }

        // Filter button functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                displaySkills(category);
            });
        });

        // Display all skills when the page first loads
        displaySkills('All');
    });
}

// Export function for Jest
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filterSkillsByCategory };
}
