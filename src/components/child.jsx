export default function ChildComponent(props) {
  const { show } = props;

  return (
    <div className="mt-8">
      {show === "learnMore" ? (
        <>
          <div className=" mx-auto w-5/6">
            <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">
              Track work across the enterprise through an open, collaborative
              platform. Link issues across Jira and ingest data from other
              software development tools, so your IT support and operations
              teams have richer contextual information to rapidly respond to
              requests, incidents, and changes.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions.Accelerate critical development work,
              eliminate toil, and deploy changes with ease, with a complete
              audit trail for every change.
            </p>
            <div className="mx-auto w-5/6">
              <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
                {[
                  "Eliminate toil",
                  "Deploy changes with ease",
                  "Complete audit trail for every change",
                ].map((item, index) => (
                  <li key={index}>
                  
                     {item}
                      <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                        <li>
                          You might feel like you are being really "organized" o
                        </li>
                        <li>
                          Nested navigation in UIs is a bad idea too, keep
                          things as flat as possible.
                        </li>
                        <li>
                          Nesting tons of folders in your source code is also
                          not helpful.
                        </li>
                      </ol>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
         
        </>
      )}
    </div>
  );
}
