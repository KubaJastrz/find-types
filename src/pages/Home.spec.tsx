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
  expect(spy).toHaveBeenCalledWith('react')
  expect(spy).toHaveBeenCalledTimes(1)

  // console.log(input.value)

  // screen.debug()
})
