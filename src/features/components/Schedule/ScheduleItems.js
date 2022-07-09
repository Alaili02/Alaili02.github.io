import React from 'react';
import { connect } from 'react-redux';
import { removeScheduleItem, selectItems } from '../../../store/scheduleSlice.js';
import styled from 'styled-components';
import { ParseTime } from './Schedule.js';
import { GridHeader as Header, Button } from '../../PrimaryStyles.js'

const ItemHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem 0;
    > p {
        margin: 0 auto 0 10px;
        font-weight: bolder;
    }
`;

const RemoveButton = styled(Button)`
    margin: 0;
    padding: 0;
    height: 2rem;
    width: 2rem;
`;

const ItemInfoWrapper = styled.div`
    background-color: ${props => props.color};
    display: grid;
    grid-template-columns: repeat(3, auto);

    > p {
        margin: 0;
        padding: 0;
        text-align: center;
    }
`;


const ScheduleItemContainer = styled.div`
    margin: 0.5rem 0;
`;
const Circle = styled.div`
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 50%;
    background-color: ${props => props.color};
`;

const ItemInfo = ({ content }) => (
    <ItemInfoWrapper>
        {content.map(subItem => (
            <React.Fragment key={'subItem'+subItem.day+subItem.type+subItem.timeStart+subItem.timeEnd}>
                <p>{subItem.day}</p>
                <p>{subItem.type}</p>
                <p>{ParseTime(subItem.timeStart)} - {ParseTime(subItem.timeEnd)}</p>
            </React.Fragment>
        ))}
    </ItemInfoWrapper>
)
const ScheduleItem = ({id, name, color, content, onRemoveScheduleItem}) => (
    <ScheduleItemContainer>
        <ItemHeader>
            <Circle color={color}/>
            <p>{name}</p>
            <RemoveButton onClick={() => onRemoveScheduleItem(id)}>X</RemoveButton>
        </ItemHeader>
        <ItemInfo content={content}/>
    </ScheduleItemContainer>
);
const ScheduleItems = ({scheduleItems, onRemoveScheduleItem}) => {
    return(
        <div>
            <Header>Content</Header>
            {scheduleItems.map(
                (item) => 
                <ScheduleItem 
                    id={item.id}
                    name={item.name}
                    color={item.color} 
                    content={item.content}
                    key={'Items - '+item.id}
                    onRemoveScheduleItem={onRemoveScheduleItem}/>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    scheduleItems: selectItems(state)
});
const mapDispatchToProps = dispatch => ({
    onRemoveScheduleItem: (id) => dispatch(removeScheduleItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleItems);