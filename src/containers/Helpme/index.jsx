import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';

import { fetchHelpmes } from '../../api/helpme';

import HelpmeHeader from './components/HelpmeHeader';
import HelpmeBody from './components/HelpmeBody';
import Loading from '../../components/Loading';

import './Helpme.css';

const Helpme = () => {
  const [isLoading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [memory, setMemory] = useState([0]);
  /**
   * fetch all data
   */
  const fetchData = async () => {
    setLoading(true);
    const response = await fetchHelpmes();
    if (response) {
      setSections(response);
    }
    setLoading(false);
  };

  const setMemorySection = (index) => {
    const newMemory = [...memory];
    newMemory.pop();
    newMemory.push(index);
    setMemory(newMemory);
  };

  const addMemory = (tree) => {
    setMemory([...memory, ...tree]);
  };

  const onChangeSection = index => () => {
    setCurrentSection(index);
    setMemorySection(index);
  };

  const getSection = () => {
    if (sections.length <= 0) {
      return [];
    }

    if (memory.length === 1) {
      return sections;
    }

    let section = [];
    for (let i = 0; i < memory.length - 1; i += 1) {
      const index = memory[i];
      if (i === 0) {
        section = sections[index];
      }

      else {
        section = section.sections[index];
      }
    }

    return section.sections;
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const section = getSection();
  const items = section[currentSection] || {};
  return (
    <Container component="main" maxWidth="lg">
      <HelpmeHeader />
      <HelpmeBody
        sections={section}
        items={items}
        addMemory={addMemory}
        currentSection={currentSection}
        onChangeSection={onChangeSection}
      />
      { isLoading && <Loading /> }
    </Container>
  );
};

export default Helpme;
