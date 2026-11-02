
const {
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser
} = require('../script');

describe('filterSkillsByCategory', () => {
  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 }
  ];

  test('Filters skills by category', () => {
    const result = filterSkillsByCategory(skills, 'Programming');

    expect(result).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 }
    ]);
  });

  test('Returns all skills when category is All', () => {
    const result = filterSkillsByCategory(skills, 'All');

    expect(result).toEqual(skills);
  });

  test('Returns an empty array when no skills match', () => {
    const result = filterSkillsByCategory(skills, 'Cooking');

    expect(result).toEqual([]);
  });
});

describe('calculateTotalCosts', () => {
    test('Returns correct costs for different hourly rates and hours', () => {
        expect(calculateTotalCosts(20, 2)).toBe(40);
        expect(calculateTotalCosts(25, 3)).toBe(75);
    });

    test('Handles free sessions and zero hours', () => {
        expect(calculateTotalCosts(0, 3)).toBe(0);
        expect(calculateTotalCosts(20, 0)).toBe(0);
    });

    test('Calculates costs correctly for decimal hours', () => {
        expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
    });
});


describe('matchSkillsToUser', () => {
    const skills = [
        { title: 'Python Tutoring', category: 'Programming', price: 20 },
        { title: 'JavaScript Help', category: 'Programming', price: 25 },
        { title: 'Guitar Lessons', category: 'Music', price: 15 },
        { title: 'Resume Review', category: 'Career', price: 0 }
    ];

    test('Matches skills by category and price', () => {
        const userNeeds = {
            category: 'Programming',
            maxPrice: 30
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'JavaScript Help', category: 'Programming', price: 25 }
        ]);
    });

    test('Filters skills by maximum price', () => {
        const userNeeds = {
            category: 'Programming',
            maxPrice: 20
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 }
        ]);
    });

    test('Returns an empty array when no skills match', () => {
        const userNeeds = {
            category: 'Cooking',
            maxPrice: 100
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([]);
    });

    test('Includes free skills when maximum price is zero', () => {
        const userNeeds = {
            category: 'Career',
            maxPrice: 0
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([
            { title: 'Resume Review', category: 'Career', price: 0 }
        ]);
    });
});

