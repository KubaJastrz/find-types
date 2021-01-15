import React from 'react'
import {
  render,
  screen,
  userEvent,
  fireEvent,
  waitForLoadingToStart,
  waitForLoadingToFinish,
} from '@/utils/testing'
import {Home} from './Home'
import {API} from '@/api/client'

it('works', async () => {
  const spy = jest.spyOn(API, 'getPackageDetails')

  render(<Home />)

  const input = screen.getByRole('textbox') as HTMLInputElement

  userEvent.type(input, 'react')
  fireEvent.keyDown(input, {
    key: 'Enter',
  })

  await waitForLoadingToStart()
  await waitForLoadingToFinish()

  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenLastCalledWith('react')

  userEvent.clear(input)
  userEvent.type(input, 'vue')
  fireEvent.keyDown(input, {
    key: 'Enter',
  })

  await waitForLoadingToStart()
  await waitForLoadingToFinish()

  expect(spy).toHaveBeenCalledTimes(2)
  expect(spy).toHaveBeenLastCalledWith('vue')
})
