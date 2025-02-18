import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create School
  const school = await prisma.school.create({
    data: {
      name: 'Example School',
      address: '123 Main St',
    },
  });

  // Create Teachers
  const teacher1 = await prisma.teacher.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      schoolId: school.id,
    },
  });

  const teacher2 = await prisma.teacher.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      schoolId: school.id,
    },
  });

  // Create Classes
  const class1 = await prisma.class.create({
    data: {
      name: 'Math 101',
      teacherId: teacher1.id,
      schoolId: school.id,
    },
  });

  const class2 = await prisma.class.create({
    data: {
      name: 'Science 101',
      teacherId: teacher1.id,
      schoolId: school.id,
    },
  });

  const class3 = await prisma.class.create({
    data: {
      name: 'History 101',
      teacherId: teacher2.id,
      schoolId: school.id,
    },
  });

  const class4 = await prisma.class.create({
    data: {
      name: 'English 101',
      teacherId: teacher2.id,
      schoolId: school.id,
    },
  });

  // Create Students
  const student1 = await prisma.student.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      schoolId: school.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      schoolId: school.id,
    },
  });

  // Create Enrollments
  await prisma.enrollment.create({
    data: {
      studentId: student1.id,
      classId: class1.id,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student1.id,
      classId: class2.id,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student2.id,
      classId: class3.id,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student2.id,
      classId: class4.id,
    },
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
