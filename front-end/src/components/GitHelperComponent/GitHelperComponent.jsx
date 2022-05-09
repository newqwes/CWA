import React, { useState, Fragment, useEffect } from 'react';
import { Typography, Switch } from 'antd';

import { TextAreaAnt } from './styled';

const { Paragraph } = Typography;

const UNIQ_SEPARATE = 'H%$w1';
const PAA_PREFIX = 'PAA-';

const GitHelperComponent = () => {
  const [task, setTask] = useState('');
  const [checked, setChecked] = useState(true);
  const [gitComands, setGitComands] = useState('');
  const [titleText, setTitleText] = useState('');

  useEffect(() => {
    if (task) {
      const branchType = checked ? 'bugfix' : 'feature';

      const replacedSeparete = task.replace(/\n/g, UNIQ_SEPARATE);

      if (!replacedSeparete) {
        return;
      }

      const [, taskRawText] = replacedSeparete.split('PAA-');

      if (!taskRawText) {
        return;
      }

      const [taskNumber, taskText] = taskRawText.split(UNIQ_SEPARATE);

      if (!taskNumber || !taskText) {
        return;
      }

      const clearBranchName = `${branchType}/${PAA_PREFIX + taskNumber}-${taskText
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}\[\]=\-_`\'~()]/g, '')
        .replace(/ /g, '-')}`;

      const commandCreateBranchText = `git checkout -b ${clearBranchName}`;
      const commandPushBranchText = `git push --set-upstream origin ${clearBranchName}`;
      const prTitleText = `${PAA_PREFIX + taskNumber}: ${taskText}`;

      setGitComands(`${commandCreateBranchText} && ${commandPushBranchText}`);
      setTitleText(prTitleText);
    } else {
      setGitComands('');
      setTitleText('');
    }
  });

  return (
    <Fragment>
      <Switch
        checkedChildren='bugfix'
        onChange={e => setChecked(e)}
        checked={checked}
        unCheckedChildren='feature'
      />
      <TextAreaAnt
        rows={4}
        placeholder='
      100 Pepsi Asasin AdminPAA-19999
      KTDs: Incorrect validation when rename label'
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <Paragraph copyable={{ text: gitComands }}>
        Git comands:
        {gitComands}
      </Paragraph>
      <Paragraph copyable={{ text: titleText }}>Title text: {titleText}</Paragraph>
    </Fragment>
  );
};

export default GitHelperComponent;
