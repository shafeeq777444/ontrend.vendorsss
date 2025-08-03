import React from 'react';
import styled from 'styled-components';
import { DoorOpen, DoorClosed } from 'lucide-react';

const ShopOpenCloseButton = ({ onClick }) => {
  return (
    <StyledWrapper>
      <div onClick={onClick} className="container">
        <label htmlFor="switch" className="toggle">
          <input type="checkbox" className="input" id="switch" />
          <DoorClosed className="icon icon--off" size={32} color="white" />
          <DoorOpen className="icon icon--on" size={32} color="white" />
          <span className="tooltip tooltip--closed">Shop Closed</span>
          <span className="tooltip tooltip--open">Shop Open</span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle {
    position: relative;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    background-color: rgba(0,0,0,0.2);
    transition: background 0.3s;
  }

  .toggle:hover {
    background-color: rgba(0,0,0,0.2);
  }

  .input {
    display: none;
  }

  .icon {
    position: absolute;
    transition: transform 300ms ease;
  }

  .icon--on {
    transform: scale(0);
  }

  #switch:checked + .icon--off {
    transform: scale(0);
  }

  #switch:checked ~ .icon--on {
    transform: scale(1);
  }

  .tooltip {
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%) scale(0.95);
    background-color: #1f1f1f;
    color: #fff;
    padding: 6px 10px;
    font-size: 13px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 6px;
    border-style: solid;
    border-color: #1f1f1f transparent transparent transparent;
  }

  .toggle:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  .tooltip--open {
    display: none;
  }

  .tooltip--closed {
    display: block;
  }

  #switch:checked ~ .tooltip--closed {
    display: none;
  }

  #switch:checked ~ .tooltip--open {
    display: block;
  }
`;

export default ShopOpenCloseButton;
