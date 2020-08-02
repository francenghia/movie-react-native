import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { withTheme } from '../../themes';
import { useRemoteConfig } from '../../hooks';
import { THEMOVIEDB_RESOURCE_URL } from '../../constants/firebase-constants';
import Text from './Text';

const defaultProfilePic = require('../../assets/person.png');

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  character: PropTypes.string,
  profilePath: PropTypes.string,
};

const defaultProps = {
  character: null,
  profilePath: null,
};

const Person = ({
  id,
  name,
  theme,
  character,
  profilePath,
  navigation: { navigate },
}) => {
  const resourceUrl = useRemoteConfig({ key: THEMOVIEDB_RESOURCE_URL });
  const source = profilePath ? { uri: `${THEMOVIEDB_RESOURCE_URL}w185${profilePath}` } : defaultProfilePic;
  console.log("source" + JSON.stringify(source))
  return (
    <TouchableOpacity onPress={() => navigate('person', { id })}>
      <View style={{ width: 80 }}>
        <Image
          style={styles.imageStyle}
          source={source}
          resizeMode="cover"
        />
        <View style={{ alignItems: 'center' }}>
          <Text
            small
            color={theme.secondaryColor}
            numberOfLines={1}
          >
            {name}
          </Text>
          {!!character && (
            <Text
              small
              numberOfLines={1}
            >
              {character}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 5,
  },
});

Person.propTypes = propTypes;
Person.defaultProps = defaultProps;

export default withNavigation(withTheme(Person));