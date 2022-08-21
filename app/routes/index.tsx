import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return {
    title: 'Find Types',
  };
};

export default function Index() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
