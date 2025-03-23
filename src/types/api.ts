import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

type ResponseError = AxiosError<{
  // 에러 객체 타입
  statusCode: number
  message: string
  error: string
}>

/**
 * GET요청이 아닌 나머지에 대한 queryOption
 */
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>

/**
 * GET요청에 대한 queryOption
 */
type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>

export type { ResponseError, UseMutationCustomOptions, UseQueryCustomOptions }
