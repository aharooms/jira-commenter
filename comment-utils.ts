const identifier = (appName: string) => {
  return `Preview Deploy for ${appName} ready!`;
};

export const getCommentsOfAdmin = (
  comments: any[],
  jiraAccount: string,
  appName: string,
) => {
  const commentsOfAdmin = comments.filter(
    (c) => c?.author?.emailAddress === jiraAccount,
  );

  const firstLineOfEveryComments = commentsOfAdmin.reduce<
    Array<{ line: string; id: number }>
  >((lines, currentComment) => {
    const text = currentComment.body.content[0].content.reduce((acc, cur) => {
      return (acc += cur?.text ?? '');
    }, '');

    return lines.concat({ line: text, id: currentComment.id });
  }, []);

  return firstLineOfEveryComments.filter((l) => l.line === identifier(appName));
};

export const getCommentString: ({
  appName,
  commitLink,
  previewUrl,
  pullRequestLink,
}: {
  appName: string;
  commitLink: string;
  previewUrl: string;
  pullRequestLink?: string;
}) => string = ({ appName, commitLink, previewUrl, pullRequestLink }) => {
  return JSON.stringify(
    JSON.stringify({
      body: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Preview Deploy for ',
              },
              {
                type: 'text',
                text: appName,
                marks: [
                  {
                    type: 'em',
                  },
                ],
              },
              {
                type: 'text',
                text: ' ready!',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Built with commit ',
              },
              {
                type: 'text',
                text: commitLink.split('/').pop().slice(0, 8),
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: commitLink,
                      title: 'Commit link',
                    },
                  },
                ],
              },
            ],
          },
          ...(pullRequestLink !== ''
            ? [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Pull Request link ',
                    },
                    {
                      type: 'text',
                      text: pullRequestLink,
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: pullRequestLink,
                            title: 'PR link',
                          },
                        },
                      ],
                    },
                  ],
                },
              ]
            : []),
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: previewUrl,
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: previewUrl,
                      title: 'Deploy preview url',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    }),
  );
};
