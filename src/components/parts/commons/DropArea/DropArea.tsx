import React, { VFC, useState, useCallback, DragEvent, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  onDrop: (e: DragEvent) => void;
};

export const DropArea: VFC<Props> = ({ children, onDrop }) => {
  const [hovered, setHovered] = useState(false);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setHovered(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setHovered(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setHovered(false);
      onDrop(e);
    },
    [onDrop],
  );

  return (
    <StyledDropArea hovered={hovered} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {children}
    </StyledDropArea>
  );
};

const StyledDropArea = styled.div<{ hovered: boolean }>`
  border: 1px dashed ${(props) => props.theme.palette.grey[200]};
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.grey[100]};
  opacity: ${(props) => (props.hovered ? 0.6 : 1)};
  transition: opacity 0.2s;
`;
