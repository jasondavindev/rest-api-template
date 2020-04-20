import { SelectQueryBuilder } from 'typeorm'

export const mountPaginationParams = (page: number, limit: number) => {
  if (!page || page < 1) return { limit, skip: 0 }

  return {
    limit,
    skip: (page - 1) * limit
  }
}

export const pagination = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number,
  perPage: number
) => {
  const paginationParams = mountPaginationParams(page, perPage)
  return queryBuilder.limit(paginationParams.limit).offset(paginationParams.skip)
}

export const mountWhereParams = (column: string, value: number | string) => {
  const paramName = column.split('.').length === 2 ? column.replace('.', '_') : column

  return {
    whereString: `${column} = :${paramName}`,
    whereObject: Object.defineProperty({}, paramName, {
      value,
      enumerable: true
    })
  }
}

export const addWhere = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  column: string,
  value: number | string
) => {
  if (value === null || value === undefined) return queryBuilder
  const whereParams = mountWhereParams(column, value)

  // Create named params
  return queryBuilder.andWhere(whereParams.whereString, whereParams.whereObject)
}

// eslint-disable-next-line max-len
export const mountDynamicWhereQueryBuilder = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: object
) => Object.entries(obj).reduce(
    (pre, cur): SelectQueryBuilder<T> => this.addWhere(pre, cur[0], cur[1]),
    queryBuilder
  )
