import React from 'react'
import {
  render,
  screen,
  act,
  userEvent,
  fireEvent,
  waitForLoadingToStart,
  waitForLoadingToFinish,
} from '/@/utils/testing'
import {Home} from './Home'
import {API} from '/@/api/client'

it('works', async () => {
  const spy = jest.spyOn(API, 'getPackageDetails')

  render(<Home />)

  const input = screen.getByRole('textbox') as HTMLInputElement

  await act(() => userEvent.type(input, 'react', {delay: 1}))
  fireEvent.keyDown(input, {
    key: 'Enter',
  })

  await waitForLoadingToStart()
  await waitForLoadingToFinish()

  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenLastCalledWith('react')

  userEvent.clear(input)
  await act(() => userEvent.type(input, 'vue', {delay: 1}))
  fireEvent.keyDown(input, {
    key: 'Enter',
  })

  await waitForLoadingToStart()
  await waitForLoadingToFinish()

  expect(spy).toHaveBeenCalledTimes(2)
  expect(spy).toHaveBeenLastCalledWith('vue')
})
