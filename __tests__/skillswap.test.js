
const { filterSkillsByCategory } = require('../script');

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
