import Button from '@/Components/Antd/Button';
import Card from '@/Components/Antd/Card';
import Row from '@/Components/Antd/Row';
import Col from '@/Components/Antd/Col';
import Form from '@/Components/Antd/Form';
import FormItem from '@/Components/Antd/Form.Item';
import Input from '@/Components/Antd/Input';
import Switch from '@/Components/Antd/Switch';
import Text from '@/Components/Antd/Text';
import { IAntdComp } from '@/Components/BaseComp/index.d';

export default {
  Text,
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  'Form.Item': FormItem,
  Switch,
} as Record<string, IAntdComp<any>>;
