import toast, { Toaster } from 'solid-toast';

const notify = () =>
  toast.success('Copiado!', {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width={1.5}
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>
    ),
    position: 'top-center',
  });

export const copyToClipboard = (text: string) => {
  copyTextToClipboard(text);
};

function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}

type Props = {
  sourcce: string;
  situation: string;
  example: string;
  responses: {
    heading: string;
    msg: string;
  }[];
};
const Row = (props: Props) => {
  const copyRow = (text: string) => {
    console.log('hi');
    copyToClipboard(text);
    notify();
  };
  return (
    <div>
      <h4>{props.sourcce}</h4>
      <div>
        <p>
          <b>Situación:</b> {props.situation}
        </p>
        <p>
          <b>Ejemplo:</b> {props.example}
        </p>
        <ul class="space-y-3 pl-0 ml-0 prose">
          {props.responses.map((response) => {
            return (
              <li class="">
                <div>
                  <button
                    type="button"
                    onClick={() => copyRow(response.msg)}
                    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {response.heading}
                  </button>

                  <p>{response.msg}</p>
                </div>
              </li>
            );
          })}
        </ul>
        {/* <p>
          <b></b>{' '}
        </p>
        <p>
          <b></b>{' '}
        </p> */}
      </div>
    </div>
  );
};
export default function Chunks(props: { chunks: Props[] }) {
  return (
    <>
      {props.chunks.map((row) => (
        <Row {...row} />
      ))}
      <Toaster />{' '}
    </>
  );
}
