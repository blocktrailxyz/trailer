async function seedable( action: () => Promise<void>): Promise<void> {
  console.log('Connecting to the database...');

  try {
    console.log('seeding...');
    await action();
    console.log('Done seeding...');

  }
  catch (error) {
    console.log('Error seeding:', error)
  }
}

export default seedable