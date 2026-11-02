
const {
    filterSkillsByCategory,
    calculateTotalCosts
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
