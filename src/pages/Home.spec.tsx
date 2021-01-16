import React from 'react'

import {API} from '@/api/client'
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitForLoadingToFinish,
  waitForLoadingToStart,
} from '@/utils/testing'

import {Home} from './Home'

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
