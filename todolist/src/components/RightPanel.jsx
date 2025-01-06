const RightPanel = ({ selectedTask }) => {
    return (
      <aside className="w-1/4 bg-card-light dark:bg-card-dark p-4 h-screen shadow-light dark:shadow-dark">
        {selectedTask ? (
          <>
            <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
            <p className="text-text-mutedLight dark:text-text-mutedDark mb-4">
              {selectedTask.description}
            </p>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Links</h3>
              <ul className="list-disc ml-4">
                {selectedTask.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-secondary hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Attachments</h3>
              <ul>
                {selectedTask.attachments.map((file, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-secondary hover:underline"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-text-mutedLight dark:text-text-mutedDark">
            Select a task to view its details.
          </p>
        )}
      </aside>
    );
  };
  
  export default RightPanel;
  