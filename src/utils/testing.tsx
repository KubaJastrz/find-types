import * as RTL from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {AppProviders} from '../AppProviders'

type RenderOptions = RTL.RenderOptions & {
  route?: string
}

export function render(
  ui: React.ReactElement,
  {route = '/', ...renderOptions}: RenderOptions = {},
) {
  window.history.pushState({}, 'Test page', route)

  return RTL.render(ui, {
    wrapper: AppProviders,
    ...renderOptions,
  })
}

export function waitForLoadingToStart() {
  return RTL.screen.findAllByTestId(/loading/i)
}

export function waitForLoadingToFinish() {
  return RTL.waitForElementToBeRemoved(() => [...RTL.screen.queryAllByTestId(/loading/i)], {
    timeout: 4000,
  })
}

export * from '@testing-library/react'
export {userEvent}
