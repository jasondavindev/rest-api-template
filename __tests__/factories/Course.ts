import faker from 'faker'
import { getRepository } from 'typeorm'

import { Course } from '@/database/models'

export const createCourse = (data?: Course) => {
  const course = new Course({
    name: faker.name.title()
  } as Course)

  Object.assign(course, data)
  return course
}

export const populateCourseTable = (qty: number, data?: Course) => {
  const courses = Array(qty).fill(data).map(createCourse)

  return getRepository(Course).save(courses)
}
